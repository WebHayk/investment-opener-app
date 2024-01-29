export class Helpers {
    static dateStarterFormatter = (date: string) => {
        let components = date.split(" ");

        let dateComponents = components[0].split("/");
        let timeComponents = components[1].split(":");

        return new Date(new Date().getFullYear(), +dateComponents[0] - 1, +dateComponents[1] + 1, +timeComponents[0], +timeComponents[1], +timeComponents[2]);
    }
}