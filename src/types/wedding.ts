export interface TimelineItem {
  id: string;
  time: string;
  title: string;
  description?: string;
  iconName: string;
}

export interface DressColorOption {
  name: string;
  hex: string;
  borderHex?: string;
}

export interface DressCodeTheme {
  category: string;
  description: string;
  colors: DressColorOption[];
}

export interface VenueDetails {
  name: string;
  address: string;
  city: string;
  googleMapsUrl: string;
  embedMapUrl?: string;
  phone?: string;
}

export interface WeddingDetails {
  groomName: string;
  brideName: string;
  eventTitle: string;
  isoDate: string; // ISO format string for exact live countdown parsing
  displayDate: string;
  timeRange: string;
  venue: VenueDetails;
  timeline: TimelineItem[];
  dressThemes: DressCodeTheme[];
  quranVerse: {
    arabic: string;
    english: string;
    reference: string;
  };
}

export interface RsvpFormData {
  fullName: string;
  phoneNumber: string;
  attending: "yes" | "no";
  guestCount: number;
  specialNote?: string;
}

export interface RsvpApiResponse {
  success: boolean;
  message: string;
}
