// Define the specific tiers based on your application's subscription model
export type SubscriptionPlan = 'SEED' | 'SPROUT' | 'BLOOM';

// Assign a numerical hierarchy to each plan. 
// Higher numbers grant access to lower-tier features (e.g., BLOOM includes SPROUT).
const PLAN_HIERARCHY: Record<SubscriptionPlan, number> = {
    'SEED': 100,      // Starter tier
    'SPROUT': 200,    // Standard tier
    'BLOOM': 300,     // Premium tier (Highest access)
};

/**
 * Checks if the school's current subscription plan meets or exceeds the required plan tier 
 * for a specific feature or API endpoint.
 * * @param currentPlan The plan the school is currently subscribed to (e.g., 'SPROUT').
 * @param requiredPlan The minimum plan required to access the feature (e.g., 'BLOOM').
 * @returns boolean - True if access is granted.
 */
export const checkTierAccess = (currentPlan: SubscriptionPlan, requiredPlan: SubscriptionPlan): boolean => {
    
    // Safety check: ensure both plans exist in the hierarchy map
    if (!PLAN_HIERARCHY[currentPlan] || !PLAN_HIERARCHY[requiredPlan]) {
        console.error(`[BILLING_UTILS] Unknown plan encountered: Current=${currentPlan}, Required=${requiredPlan}`);
        return false;
    }

    const currentLevel = PLAN_HIERARCHY[currentPlan];
    const requiredLevel = PLAN_HIERARCHY[requiredPlan];

    // Access is granted if the current plan's level is greater than or equal to the required level.
    // Example: If currentLevel (300/BLOOM) >= requiredLevel (200/SPROUT) => TRUE
    return currentLevel >= requiredLevel;
};