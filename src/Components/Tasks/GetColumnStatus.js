function getStatusFromColumnId(columnId) {
    switch (columnId) {
      case "backlog":
        return "Backlog";
      case "todo":
        return "To Do";
      case "inProgress":
        return "In Progress";
      case "completed":
        return "Completed";
      case "review":
        return "Review";
      default:
        return "";
    }
}

function isValidColumn(columnId) {
    const validColumns = [
      "backlog",
      "todo",
      "inProgress",
      "review",
      "completed",
    ];
    return validColumns.includes(columnId);
};

export { getStatusFromColumnId, isValidColumn };