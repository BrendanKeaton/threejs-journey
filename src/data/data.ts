import FirstThreeJSProject from "@/threejs-scenes/first_threejs_project";
import TransformObject from "@/threejs-scenes/transform_objects";

type Section = {
  type: "section";
  id: string;
  title: string;
  Scene: React.ComponentType;
  load: boolean;
};

type Chapter = {
  type: "chapter";
  title: string;
};

type SectionOrChapter = Section | Chapter;

export const sections: SectionOrChapter[] = [
  { type: "chapter", title: "01 - Basics" },
  {
    type: "section",
    id: "first-threejs-project",
    title: "First Three.js Project",
    Scene: FirstThreeJSProject,
    load: true,
  },
  {
    type: "section",
    id: "transform-object",
    title: "Transform Objects",
    Scene: TransformObject,
    load: true,
  },
  { type: "chapter", title: "02 - Classic Techniques" },
  { type: "chapter", title: "03 - Advanced Techniques" },
  { type: "chapter", title: "04 - Shaders" },
  { type: "chapter", title: "05 - Extra" },
  { type: "chapter", title: "06 - Portal Scene" },
  { type: "chapter", title: "07 - React Three Fiber" },
];
