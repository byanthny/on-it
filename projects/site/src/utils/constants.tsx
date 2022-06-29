import { TaskState } from "common";

export const monthShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Nov",
  "Dev",
];

export const monthLong = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const millisecondsInADay = 1000 * 60 * 60 * 24;

export const fakeNoteData = [
  {
    _id: "string",
    uid: "string",
    parent: "string",
    title: "stringstringstringstringstring",
    text: "string",
    tags: [
      {
        _id: "string",
        uid: "string",
        name: "TsRqcLgjUIhb",
        color: "#b5De21",
      },
      {
        _id: "string",
        uid: "string",
        name: "TsRqcLgjUIhb",
        color: "#b5De21",
      },
      {
        _id: "string",
        uid: "string",
        name: "TsRqcLgjUIhb",
        color: "#b5De21",
      },
    ],
    createdAt: "2022-06-22T00:25:20.710Z",
    updated: "2022-06-22T00:25:20.710Z",
  },
  {
    _id: "string",
    uid: "string",
    parent: "string",
    title: "string",
    text: "stringstringstringstringstringstringstringstringstringstringstringstring",
    tags: [
      {
        _id: "string",
        uid: "string",
        name: "TsRqcLgjUIhb",
        color: "#b5De21",
      },
    ],
    createdAt: "2022-06-22T00:25:20.710Z",
    updated: "2022-06-22T00:25:20.710Z",
  },
  {
    _id: "string",
    uid: "string",
    parent: "string",
    title: "string",
    text: "string",
    tags: [
      {
        _id: "string",
        uid: "string",
        name: "TsRqcLgjUIhb",
        color: "#b5De21",
      },
    ],
    createdAt: "2022-06-22T00:25:20.710Z",
    updated: "2022-06-22T00:25:20.710Z",
  },
  {
    _id: "string",
    uid: "string",
    parent: "string",
    title: "string",
    text: "stringstringstringstringstringstringstringstringstringstringstringstring",
    tags: [
      {
        _id: "string",
        uid: "string",
        name: "TsRqcLgjUIhb",
        color: "#b5De21",
      },
    ],
    createdAt: "2022-06-22T00:25:20.710Z",
    updated: "2022-06-22T00:25:20.710Z",
  },
  {
    _id: "string",
    uid: "string",
    parent: "string",
    title: "string",
    text: "stringstringstringstringstringstringstringstringstringstringstringstring",
    tags: [
      {
        _id: "string",
        uid: "string",
        name: "TsRqcLgjUIhb",
        color: "#b5De21",
      },
    ],
    createdAt: "2022-06-22T00:25:20.710Z",
    updated: "2022-06-22T00:25:20.710Z",
  },
];

export const fakeTaskData = [
  {
    _id: "string",
    uid: "string",
    parent: undefined,
    title: "test",
    due: 0,
    reminders: ["2022-05-16T23:09:56.903Z"],
    state: TaskState.TODO,
    pinned: false,
    tags: [
      {
        _id: "string",
        uid: "string",
        name: "mOwV",
        color: "#bEF",
      },
    ],
  },
  {
    _id: "string",
    uid: "string",
    parent: undefined,
    title: "super long to do because idk super long to do because idk",
    due: 0,
    reminders: ["2022-05-16T23:09:56.903Z"],
    state: TaskState.DONE,
    pinned: false,
    tags: [
      {
        _id: "string",
        uid: "string",
        name: "mOwV",
        color: "#bEF",
      },
    ],
  },
  {
    _id: "string",
    uid: "string",
    parent: undefined,
    title: "medium to do because idk",
    due: 0,
    reminders: ["2022-05-16T23:09:56.903Z"],
    state: TaskState.TODO,
    pinned: false,
    tags: [
      {
        _id: "string",
        uid: "string",
        name: "mOwV",
        color: "#bEF",
      },
    ],
  },
];
