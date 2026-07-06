# Mathematical Specification of the Proficiency Service

## Overview
This document outlines the mathematical formulas, decay models, and scaling factors used to calculate a user's muscle group proficiency score. The system evaluates historical training data, applies an exponential decay weight to older sets to protect current strength estimates, and normalizes the final metrics based on the user's body weight and gender.

The underlying business logic is implemented within `ProficiencyService` and draws global configuration variables from `ProficiencyConfig`.

---

## 1. Global Parameters (`proficiency.config.ts`)

The calculations rely on the following constants defined in the configuration layer:

* **`STANDARD_BODYWEIGHT`** ($W_{\text{std}}$): `85.0` kg — Used as a median baseline to normalize relative strength values.
* **`GRACE_PERIOD_DAYS`** ($T_{\text{grace}}$): `7` days — The time window following a workout during which a set retains full mathematical relevance (100% weight).
* **`TAU`** ($\tau$): `30` days — The exponential decay time constant governing the rate at which historical data relevance degrades.
* **`MIN_RESIDUAL_FACTOR`** ($K_{\text{min}}$): `0.05` — The absolute lower bound for a set's relevance coefficient, ensuring any recorded set retains at least 5% importance indefinitely.
* **`GENDER_MODIFIERS`**: `male: 1.0`, `female: 1.6` — Biological scaling constants to balance proficiency ratios across genders.

---

## 2. Core Calculations & Formulas

### 2.1. Raw 1RM Factor
**Invoked by function:** `calculateRaw1RMFactor(set: ISet, bodyweight: number)`

This function evaluates the raw performance factor of an isolated training set relative to the specific exercise's system-defined benchmark.

#### Step A: Effective Lifted Weight ($m_{\text{eff}}$)
If an exercise relies on the user's own body weight (e.g., pull-ups, dips), the user's total body weight is added to the additional external load:

$$m_{\text{eff}} = \begin{cases} m_{\text{user}} + m_{\text{added}}, & \text{if } \texttt{isBodyweight} = \text{true} \\ m_{\text{added}}, & \text{if } \texttt{isBodyweight} = \text{false} \end{cases}$$

* $m_{\text{user}}$ = Current weight of the user profile (`bodyweight`).
* $m_{\text{added}}$ = External weight recorded for the specific set (`set.weight`).

#### Step B: One-Repetition Maximum (1RM) Estimator
Estimated via Epley's linear extrapolation equation based on repetitions ($R$):

$$\text{1RM} = m_{\text{eff}} \cdot \left(1 + \frac{R}{30}\right)$$

* $R$ = Number of repetitions completed during the set (`set.reps`).

#### Step C: Adjusted Benchmark Divider ($D$)
For bodyweight exercises, the benchmark must scale relative to the mass the athlete has to shift:

$$D = B + \begin{cases} m_{\text{user}}, & \text{if } \texttt{isBodyweight} = \text{true} \\ 0, & \text{if } \texttt{isBodyweight} = \text{false} \end{cases}$$

* $B$ = Baseline objective metric assigned to the exercise (`set.exercise.benchmark`).

#### Step D: Final Pure Factor Calculation ($F_{\text{raw}}$)
Combines the estimated 1RM with the exercise importance multiplier ($K_{\text{exercise}}$) relative to the adjusted benchmark divider:

$$F_{\text{raw}} = \frac{\text{1RM} \cdot K_{\text{exercise}}}{D}$$

* $K_{\text{exercise}}$ = Exercise-specific difficulty or importance modifier (`set.exercise.factor`).

---

### 2.2. Temporal Relevance Weighting
**Invoked by function:** `calculateSetRelevanceByTime(date: Date)`

This function implements an exponential decay model to evaluate data degradation over time, generating a relevance weight ($W_t$) bounded between `0.05` and `1.0`.

#### Step A: Calculate Elapsed Age in Days ($t$)
$$t = \frac{t_{\text{current}} - t_{\text{set}}}{1000 \cdot 3600 \cdot 24}$$

* $t_{\text{current}}$ = Current system epoch time (`Date.now()`).
* $t_{\text{set}}$ = Timestamp when the specific workout set was logged (`date.getTime()`).

#### Step B: Mathematical Piecewise Decay Mapping
$$W_t = \begin{cases} 1.0, & \text{if } t \le T_{\text{grace}} \\ K_{\text{min}} + (1 - K_{\text{min}}) \cdot e^{-\frac{t - T_{\text{grace}}}{\tau}}, & \text{if } t > T_{\text{grace}} \end{cases}$$

---

### 2.3. Weighted Average 1RM Factor
**Invoked by function:** `calculateAverageDecayed1RMFactor(sets: ISet[], bodyweight: number)`

To avoid punishing long-term histories or inflating drops in fitness due to older benchmarks, the system computes a **weighted average** of all raw metrics rather than a standard arithmetic mean. Time relevance ($W_t$) dictates the statistical influence of each individual data point.

$$F_{\text{avg}} = \frac{\sum_{i=1}^{n} (F_{\text{raw}, i} \cdot W_{t, i})}{\sum_{i=1}^{n} W_{t, i}}$$

* $n$ = Count of valid logged sets containing active benchmarks within the muscle group filter.
* $F_{\text{raw}, i}$ = Clean factor computed via section 2.1.
* $W_{t, i}$ = Relevance weight computed via section 2.2.

---

### 2.4. Normalized Muscle Group Proficiency
**Invoked by function:** `calculateProficiencyForMuscleGroup(sets: ISet[], profile: IUserProfile)`

Scales and transforms the aggregated performance index ($F_{\text{avg}}$) to accurately factor in biometric parameters (gender and relative bodyweight scaling).

#### Step A: Anthropometric Weight Modifier ($M_{\text{weight}}$)
Determines the athlete's weight ratio compared to the system standard median:

$$M_{\text{weight}} = \frac{m_{\text{user}}}{W_{\text{std}}}$$

#### Step B: Total Competency Evaluation ($P$)
Normalizes strength outputs across lighter/heavier lifters and checks biological variances against the standard:

$$P = \frac{F_{\text{avg}} \cdot M_{\text{gender}}}{M_{\text{weight}}}$$

* $M_{\text{gender}}$ = Gender modifier fetched dynamically based on user profile metadata.

---

## 3. Global Orchestration Map
**Invoked by routine:** `getProficiencyForAllMuscleGroups(userId: number)`

The operational pipeline executes the mathematics through the following programmatic architecture:

```text
[Database Queries: Promise.all]
    ├── Fetch active muscle groups (allGroups)
    ├── Fetch raw historical logs (workouts -> sets)
    └── Fetch biometric information (userProfile)
                     │
                     ▼
[Data Partitioning: O(N) Complexity]
    └── Group historical sets into discrete Map buckets via set.exercise.exerciseGroupId
                     │
                     ▼
[Mathematical Mapping Loop]
    ├── Filter invalid/empty benchmarks out
    ├── Compute temporal weight (calculateSetRelevanceByTime)
    ├── Compute pure capacity factor (calculateRaw1RMFactor)
    ├── Condense into statistical weighted mean (calculateAverageDecayed1RMFactor)
    └── Scale for gender/anthropometrics (calculateProficiencyForMuscleGroup)
                     │
                     ▼
[Output Structuring]
    └── Return payload mapped to 2 decimal places (.toFixed(2))