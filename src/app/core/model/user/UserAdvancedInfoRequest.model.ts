export interface UserAdvancedInfoRequestModel {
  userId: number;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  hasPreviousExperienceWithPets: boolean;
  hasOtherPets: boolean;
  householdType: string;
  employmentStatus: string;
  reasonForAdoption: string;
  hasChildren: boolean;
  hasFencedYard: boolean;
  referenceContact: string;
  backgroundCheckStatus: string;
}
