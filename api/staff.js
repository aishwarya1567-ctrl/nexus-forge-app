let staff = [];

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(staff);
  }

  if (req.method === "POST") {
    const { name } = req.body;
    staff.push(name);
    res.status(201).json({ message: "Added", staff });
  }

  if (req.method === "DELETE") {
    const { index } = req.body;
    staff.splice(index, 1);
    res.status(200).json({ message: "Deleted", staff });
  }
}
