export default function useFormateLessons(list, setFunction) {
        let temp = [{}, {}, {}, {}, {}];

        for (let i = 0; i < list.length; i++) {
                temp[list[i].number - 1] = list[i];
        }

        setFunction(temp)
}