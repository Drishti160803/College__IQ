export interface College {
  id: string;
  name: string;
  shortName: string;
  location: {
    city: string;
    state: string;
  };
  type: "Government" | "Private" | "Deemed" | "Autonomous";
  established: number;
  rating: number;
  reviewCount: number;
  fees: {
    btech?: number;
    mtech?: number;
    mba?: number;
  };
  courses: Course[];
  placements: Placement;
  ranking: {
    nirf?: number;
    qs?: number;
    india?: number;
  };
  accreditation: string[];
  facilities: string[];
  image: string;
  logo: string;
  description: string;
  highlights: string[];
  cutoffs: Cutoff[];
  reviews: Review[];
  tags: string[];
  approved: boolean;
}

export interface Course {
  name: string;
  duration: string;
  seats: number;
  fees: number;
  eligibility: string;
}

export interface Placement {
  averagePackage: number;
  highestPackage: number;
  placementRate: number;
  topRecruiters: string[];
  medianPackage: number;
}

export interface Cutoff {
  exam: string;
  year: number;
  category: string;
  rank: number;
  branch?: string;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  pros: string[];
  cons: string[];
  batch: string;
  course: string;
  helpful: number;
}

export type SortOption =
  | "rating"
  | "fees_low"
  | "fees_high"
  | "placement"
  | "ranking";

export interface FilterState {
  query: string;
  states: string[];
  types: string[];
  feeMin: number;
  feeMax: number;
  ratingMin: number;
  exams: string[];
  courses: string[];
  sort: SortOption;
}

export interface PredictorInput {
  exam: string;
  rank: number;
  category: string;
  branch?: string;
}

export interface PredictorResult {
  college: College;
  chance: "High" | "Medium" | "Low";
  cutoffRank: number;
  branch: string;
}
