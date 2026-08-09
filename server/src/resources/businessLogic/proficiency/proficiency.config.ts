export const ProficiencyConfig = {
  GENDER_MODIFIERS: {
    male: 1.0,
    female: 1.6
  },
  STANDARD_BODYWEIGHT: 85.0,  // Standard bodyweight in kg for proficiency calculations
  GRACE_PERIOD_DAYS: 7, // Number of days after a workout during which set relevance does not lessen
  TAU: 30, // Time constant for exponential set relevance decay in days`
  MIN_RESIDUAL_FACTOR: 0.05, // Minimum residual factor after decay, decay cannot reduce set relevance below 5% 
  RELEVANT_DATA_DAYS: 90, // Number of days to consider for proficiency calculations
  TTL: 12,// Cache time-to-live in hours for proficiency calculations
  INTENSITY_POWER: 2.5, // p>1: Higher intensity sets have a disproportionately larger impact on proficiency. p<1: Lower intensity sets have a disproportionately larger impact on proficiency.
   MUSCLE_FACTOR_SOFTNESS: 2.0, // Softness factor for muscle factor influence on proficiency. Higher values make proficiency less sensitive to muscle factors.
};