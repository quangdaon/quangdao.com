export interface Activity {
  notionId: string;
  title: string;
  content: string;
}

export interface ActivitiesResponse {
  activities: Activity[]
  lastUpdated: Date
}