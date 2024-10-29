export interface ApplicationDetailsResponseModel {
  id: number; // ID of the ApplicationDetails entity
  applicationId: number; // ID of the associated Application
  firstName: string; // First name from the adoption form
  lastName: string; // Last name from the adoption form
  email: string; // Email from the adoption form
  phoneNumber: string; // Phone number from the adoption form
  address: string; // Address from the adoption form
  city: string; // City from the adoption form
  state: string; // State from the adoption form
  postalCode: string; // Postal code from the adoption form
  country: string; // Country from the adoption form
  reasonForAdoption: string; // Reason for adoption from the adoption form
  animalId: number; // ID of the animal being adopted
  pickUpTime: string; // Pick-up time from the adoption form (if in string format)
  returnTime: string; // Return time from the adoption form (if in string format)
  hasPreviousExperienceWithPets: boolean; // Previous experience with pets
  hasOtherPets: boolean; // If the applicant has other pets
  hasChildren: boolean; // If the applicant has children
  hasFencedYard: boolean; // If the applicant has a fenced yard
  referenceContact: string; // Reference contact from the adoption form
  backgroundCheckStatus: string; // Background check status
}
