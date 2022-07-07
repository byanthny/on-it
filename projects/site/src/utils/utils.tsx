import { Note, Task } from "common";
import { monthShort, millisecondsInADay } from "./constants";

export const convertMonthNum = (date: number) => monthShort[date];

export const daysTillDue = (date: string) =>
  Math.ceil((new Date(date).getTime() - Date.now()) / millisecondsInADay);

export const dateToString = (date: string) => new Date(date).toDateString();

export const toKeyValueMap = (items: Array<Task | Note>) =>
  new Map(items.map((item) => [item._id, item]));
