export const SorenessConfig = {
  SORENESS_LIMIT: 100.0,    
  RECOVERY_DAYS: 7, 
  RELATIVE_INTENSITY_THRESHOLD: 0.2, // Sets with relative intensity below this threshold contribute no stress to soreness calculations
  MIN_RECOVERY_REDUCTION: 0.3, // Minimum reduction in recovery time due to proficiency, ensuring that even highly proficient users have a baseline recovery period
  REPEATED_BOUT_LOOKBACK_DAYS: 21,       // window of time to look back for repeated bouts of exercise for the same muscle group
  REPEATED_BOUT_SATURATION_SESSIONS: 3,  // amount of sessions within the lookback window after which the repeated bout effect is considered saturated
  NOVICE_STRESS_MULTIPLIER: 2.3,         // multiplier for novice/infrequently trained groups
  ADAPTED_STRESS_MULTIPLIER: 0.7,        // multiplier for regularly trained groups
};