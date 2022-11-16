interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseDescriptopAddon extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CourseDescriptopAddon {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseDescriptopAddon {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CourseDescriptopAddon {
  type: "special";
  requirements: Array<string>;
}

export type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;
