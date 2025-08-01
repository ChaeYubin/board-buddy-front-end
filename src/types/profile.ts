export interface Profile {
  profileImageSignedURL: string | null;
  description: string;
  rank: number | null;
  buddyScore: number;
  badges: Badge[] | [];
  totalExcellentCount: number;
  totalGoodCount: number;
  totalBadCount: number;
  joinCount: number;
}

export interface EditProfileDTO {
  profileImageFile: string | null;
  nickname: string | null;
  password: string | null;
  phoneNumber: string | null;
  description: string | null;
}

export interface ExistingProfileInfo {
  profileImageFile: string | null;
  nickname: string;
  description: string;
}

export interface Badge {
  badgeImageSignedURL: string;
  badgeYearMonth: string;
}
