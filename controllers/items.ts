import _ from "lodash";
import { Item, List, ListDoc } from "../models";
import { Request, Response } from "express";

// Original task items
const item1 = new Item({
  task: "Welcome to your todo list",
  completed: false,
});
const item2 = new Item({
  task: "Hit the + button to add a new item",
  completed: false,
});
const item3 = new Item({
  task: "Hit the delete button to delete an item",
  completed: false,
});
const item4 = new Item({
  task: "Tap the task name to go back to all your tasks",
  completed: false,
});
const item5 = new Item({
  task: "Tap the moon icon to switch between dark and light modes",
  completed: false,
});

const defaultItems = [item1, item2, item3, item4, item5];

// @desc prevent GET router.route("/robots.txt") and router.route("/favicon.ico")
export const preventFaviconAndRobots = (req: Request, res: Response) => {
  res.type("text/plain");
  res.send("User-agent: *\nDisallow: /");
};

// @desc GET router.route("/")
export const getLists = async (req: Request, res: Response) => {
  try {
    const lists: ListDoc[] = await List.find();
    return res.status(200).json({
      lists,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc GET router.route("/:customListName")
export const getListItems = async (req: Request, res: Response) => {
  const customListName = _.startCase(req.params.customListName);
  try {
    const foundList: ListDoc = await List.findOne({ name: customListName });
    if (foundList) {
      return res.status(200).json({
        listTitle: foundList.name,
        items: foundList.items,
      });
    } else {
      const newList = await List.create({
        name: customListName,
        items: defaultItems,
      });
      return res.status(201).json({
        listTitle: newList.name,
        items: newList.items,
      });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc POST router.route("/:customListName")
export const addListItem = async (req: Request, res: Response) => {
  const itemName = req.body.text;
  const item = new Item({
    task: itemName,
    completed: false,
  });
  const customListName = _.startCase(req.params.customListName);
  try {
    const foundList: ListDoc = await List.findOne({ name: customListName });
    foundList.items.push(item);
    await foundList.save();
    return res.status(201).json({
      item,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc DELETE router.route("/:id")
export const deleteList = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    await List.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc DELETE router.route("/:customListName/:id")
export const deleteListItem = async (req: Request, res: Response) => {
  const customListName = _.startCase(req.params.customListName);
  const id = req.params.id;
  try {
    await List.findOneAndUpdate(
      { name: customListName },
      { $pull: { items: { _id: id } } }
    );
    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc PATCH router.route("/:customListName/:id")
export const toggleItemCompleted = async (req: Request, res: Response) => {
  const customListName = _.startCase(req.params.customListName);
  const id = req.params.id;
  const completed = req.body.completed;
  try {
    await List.findOneAndUpdate(
      { name: customListName, "items._id": id },
      { "items.$.completed": completed }
    );
    const newList: ListDoc = await List.findOne({ name: customListName });
    return res.status(200).json({
      items: newList.items,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
