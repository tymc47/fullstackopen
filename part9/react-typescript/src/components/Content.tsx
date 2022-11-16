import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({ courseParts }: { courseParts: Array<CoursePart> }) => {
  return (
    <div>
      {courseParts.map((part: CoursePart) => (
        <Part course={part} key={part.name} />
      ))}
    </div>
  );
};

export default Content;
