import {
    Project
} from "ts-morph";

// initName is name of the interface file below the root, ./src is considered the root
export const Keys = (fileName: string, intName: string): string[] => {
    const project = new Project();
    const sourceFile = project.addSourceFileAtPath(`./src/Interfaces/${fileName}.ts`);
    const node = sourceFile.getInterface(intName)!;
    const allKeys = node.getProperties().map((p) => p.getName());

    return allKeys;
};
