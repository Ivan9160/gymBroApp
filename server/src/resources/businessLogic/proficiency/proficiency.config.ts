export const ProficiencyConfig = {
  GENDER_MODIFIERS: {
    male: 1.0,
    female: 1.6
  },
  STANDARD_BODYWEIGHT: 85.0,  // Standard bodyweight in kg for proficiency calculations
  GRACE_PERIOD_DAYS: 7, // Number of days after a workout during which set relevance does not lessen
  TAU: 30, // Time constant for exponential set relevance decay in days`
  MIN_RESIDUAL_FACTOR: 0.05 // Minimum residual factor after decay, decay cannot reduce set relevance below 5% 

};