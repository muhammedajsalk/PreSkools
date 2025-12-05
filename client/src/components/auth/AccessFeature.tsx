'use client';
import React from 'react';
import { Box, Tooltip, Typography, alpha } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
// Assume SubscriptionPlan and isFeatureEnabled helper are available

type Plan = 'SEED' | 'SPROUT' | 'BLOOM';

const isFeatureEnabled = (userPlan: Plan, requiredPlan: Plan) => {
    // Assuming you move checkTierAccess logic from backend to a shared utility on frontend
    const hierarchy: Record<Plan, number> = { SEED: 1, SPROUT: 2, BLOOM: 3 };
    return hierarchy[userPlan] >= hierarchy[requiredPlan];
};


interface AccessFeatureProps {
  requiredPlan: Plan;
  children: React.ReactNode;
  userPlan: Plan; // Pass the user's current plan
}

export default function AccessFeature({ requiredPlan, children, userPlan }: AccessFeatureProps) {
  const allowed = isFeatureEnabled(userPlan, requiredPlan);
  
  if (allowed) {
    return <>{children}</>;
  }

  // Display 'Upgrade' view if restricted
  return (
    <Tooltip title={`Upgrade to ${requiredPlan} plan to unlock this feature`}>
      <Box sx={{ cursor: 'not-allowed', position: 'relative' }}>
        <Box sx={{ opacity: 0.3, pointerEvents: 'none' }}>
          {children}
        </Box>
        <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: alpha('#fff', 0.5) }}>
          <LockIcon sx={{ fontSize: 36, color: 'error.main' }} />
        </Box>
      </Box>
    </Tooltip>
  );
}





// example:-


// // File: client/src/app/(dashboard)/schoolAdmin/academic/page.tsx

// export default function AcademicManagementPage() {
//     // ... Fetch schoolPlan from useGetMeQuery ...
//     const schoolPlan = 'SEED'; // Example Hardcode
    
//     // ...
//     return (
//         // ... Academic List View ...
        
//         <AccessFeature userPlan={schoolPlan as Plan} requiredPlan="SPROUT">
//             {/* The Fee button will be clickable only on SPROUT or BLOOM */}
//             <Button onClick={handleOpenFees}>View Billing Module</Button>
//         </AccessFeature>
        
//         // ...
//     );
// }