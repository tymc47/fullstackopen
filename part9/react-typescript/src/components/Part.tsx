import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ course }: { course: CoursePart }) => {
  switch (course.type) {
    case "normal":
      return (
        <div>
          <h3>
            {course.name} {course.exerciseCount}
          </h3>
          <i>{course.description}</i>
        </div>
      );
    case "groupProject":
      return (
        <div>
          <h3>
            {course.name} {course.exerciseCount}
          </h3>
          <p>project exercise {course.groupProjectCount}</p>
        </div>
      );
    case "submission":
      return (
        <div>
          <h3>
            {course.name} {course.exerciseCount}
          </h3>
          <i>{course.description}</i>
          <p>submit to {course.exerciseSubmissionLink}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <h3>
            {course.name} {course.exerciseCount}
          </h3>
          <i>{course.description}</i>
          <div>required skills: {course.requirements.join(", ")}</div>
        </div>
      );
    default:
      return assertNever(course);
  }
};

export default Part;
