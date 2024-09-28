// "use client";
// import React, { useState, useEffect } from 'react';
// import { useGetpersona, useUpdatePersona } from '@/services/user.service';
// import { Loader } from 'lucide-react';
// import useToastMessage from '@/hooks/useToastMessage';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";

// interface PersonaData {
//   role: string;
//   interests: string[];
//   personalDescription: string;
// }

// const Account: React.FC = () => {
//   const { data: personaData, isLoading, error } = useGetpersona();
//   const updatePersonaMutation = useUpdatePersona();
//   const showToast = useToastMessage();

//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     console.log("personaData received:", personaData);
//   }, [personaData]);

//   const handleSavePersona = async () => {
//     if (personaData) {
//       try {
//         console.log("Updating persona with:", personaData);
//         await updatePersonaMutation.mutateAsync(personaData);
//         setIsEditing(false);
//         showToast({ title: "Updated successfully", type: "success" });
//       } catch (error) {
//         console.error('Error updating persona:', error);
//         showToast({ title: "Not updated", type: "error" });
//       }
//     }
//   };

//   if (isLoading) return <Loader className="animate-spin" />;
//   if (error) {
//     console.error("Error in useGetPersona:", error);
//     return <div>Error loading user data: {(error as Error).message}</div>;
//   }

//   return (
//     <div className="min-h-screen p-4 flex flex-col items-center animate-slideInFromRight">
//       <div className="w-full max-w-3xl p-6 rounded-lg shadow-md space-y-6">
//         <h1 className="text-2xl font-bold mb-4">Account</h1>

//         {personaData ? (
//           <div className="space-y-6">
//             <div className="flex flex-col">
//               <label className="text-lg font-semibold mb-1">Role</label>
//               <Input
//                 type="text"
//                 value={personaData.role || ''}
//                 onChange={(e) => personaData && (personaData.role = e.target.value)}
//                 disabled={!isEditing}
//                 placeholder={isEditing ? "Enter your role" : ""}
//               />

//               <label className="text-lg font-semibold mt-4 mb-1">Keywords that interest you</label>
//               <Input
//                 type="text"
//                 value={personaData.interests?.join(", ") || ''}
//                 onChange={(e) => personaData && (personaData.interests = e.target.value.split(", ").filter(Boolean))}
//                 disabled={!isEditing}
//                 placeholder={isEditing ? "Enter keywords that interest you" : ""}
//               />

//               <label className="text-lg font-semibold mt-4 mb-1">Personal Description</label>
//               <Textarea
//                 rows={3}
//                 value={personaData.personalDescription || ''}
//                 onChange={(e) => personaData && (personaData.personalDescription = e.target.value)}
//                 disabled={!isEditing}
//                 placeholder={isEditing ? "Enter your personal description" : ""}
//               />

//               <Button
//                 className="mt-4"
//                 onClick={isEditing ? handleSavePersona : () => setIsEditing(true)}
//               >
//                 {isEditing ? 'Save' : 'Edit Persona'}
//               </Button>
//             </div>
//           </div>
//         ) : (
//           <div>No persona data available</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Account;

'use client';
import React, { useState, useEffect } from 'react';
import { useGetpersona, useUpdatePersona } from '@/services/user.service';
import { Loader } from 'lucide-react';
import useToastMessage from '@/hooks/useToastMessage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface PersonaData {
  role?: string;
  interests?: string[];
  personalDescription?: string;
  [key: string]: any; // This allows for additional properties
}

const Account: React.FC = () => {
  const { data: apiResponse, isLoading, error } = useGetpersona();
  const updatePersonaMutation = useUpdatePersona();
  const showToast = useToastMessage();

  const [isEditing, setIsEditing] = useState(false);
  const [personaData, setPersonaData] = useState<PersonaData | null>(null);

  useEffect(() => {
    console.log('API response received:', apiResponse);
    if (apiResponse && 'data' in apiResponse) {
      setPersonaData(apiResponse.data as PersonaData);
    } else if (apiResponse) {
      setPersonaData(apiResponse as PersonaData);
    }
  }, [apiResponse]);

  const handleSavePersona = async () => {
    if (personaData) {
      try {
        console.log('Updating persona with:', personaData);
        await updatePersonaMutation.mutateAsync(personaData);
        setIsEditing(false);
        showToast({ title: 'Updated successfully', type: 'success' });
      } catch (error) {
        console.error('Error updating persona:', error);
        showToast({ title: 'Not updated', type: 'error' });
      }
    }
  };

  if (isLoading) return <Loader className="animate-spin" />;
  if (error) {
    console.error('Error in useGetPersona:', error);
    return <div>Error loading user data: {(error as Error).message}</div>;
  }

  return (
    <div className="animate-slideInFromRight flex min-h-screen flex-col items-center p-4">
      <div className="w-full max-w-3xl space-y-6 rounded-lg p-6 shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Account</h1>

        {personaData ? (
          <div className="space-y-6">
            <div className="flex flex-col">
              <label className="mb-1 text-lg font-semibold">Role</label>
              <Input
                type="text"
                value={personaData.role || ''}
                onChange={(e) =>
                  setPersonaData({ ...personaData, role: e.target.value })
                }
                disabled={!isEditing}
                placeholder={isEditing ? 'Enter your role' : ''}
              />

              <label className="mb-1 mt-4 text-lg font-semibold">
                Keywords that interest you
              </label>
              <Input
                type="text"
                value={personaData.interests?.join(', ') || ''}
                onChange={(e) =>
                  setPersonaData({
                    ...personaData,
                    interests: e.target.value.split(', ').filter(Boolean)
                  })
                }
                disabled={!isEditing}
                placeholder={
                  isEditing ? 'Enter keywords that interest you' : ''
                }
              />

              <label className="mb-1 mt-4 text-lg font-semibold">
                Personal Description
              </label>
              <Textarea
                rows={3}
                value={personaData.personalDescription || ''}
                onChange={(e) =>
                  setPersonaData({
                    ...personaData,
                    personalDescription: e.target.value
                  })
                }
                disabled={!isEditing}
                placeholder={isEditing ? 'Enter your personal description' : ''}
              />

              <Button
                className="mt-4"
                onClick={
                  isEditing ? handleSavePersona : () => setIsEditing(true)
                }
              >
                {isEditing ? 'Save' : 'Edit Persona'}
              </Button>
            </div>
          </div>
        ) : (
          <div>No persona data available</div>
        )}
      </div>
    </div>
  );
};

export default Account;
