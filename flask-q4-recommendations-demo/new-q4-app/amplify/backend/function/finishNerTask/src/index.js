/* Amplify Params - DO NOT EDIT
    API_DATAANNOTATION_ANNOTATIONPROJECTTABLE_ARN
    API_DATAANNOTATION_ANNOTATIONPROJECTTABLE_NAME
    API_DATAANNOTATION_GRAPHQLAPIIDOUTPUT
    API_DATAANNOTATION_NERANNOTATIONTASKTABLE_ARN
    API_DATAANNOTATION_NERANNOTATIONTASKTABLE_NAME
    ENV
    REGION
Amplify Params - DO NOT EDIT */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var _this = this;
var AWS = require("aws-sdk");
// import AWS from "aws-sdk"
var region = process.env.REGION;
var projectTableName = process.env.API_DATAANNOTATION_ANNOTATIONPROJECTTABLE_NAME;
var taskTableName = process.env.API_DATAANNOTATION_NERANNOTATIONTASKTABLE_NAME;
var client = new AWS.DynamoDB({
    region: region
});
var AnnotationTaskStatus;
(function (AnnotationTaskStatus) {
    AnnotationTaskStatus["TODO"] = "TODO";
    AnnotationTaskStatus["FAILED"] = "FAILED";
    AnnotationTaskStatus["DONE"] = "DONE";
})(AnnotationTaskStatus || (AnnotationTaskStatus = {}));
function getTaskArgument(event) {
    var _a;
    var task = (_a = event === null || event === void 0 ? void 0 : event.arguments) === null || _a === void 0 ? void 0 : _a.task;
    if (!task) {
        throw Error("Please provide a task as an input");
    }
    if (typeof task.project_id !== "string") {
        throw Error("Please enter a valid project id");
    }
    if (typeof task.task_id !== "string") {
        throw Error("Please enter a valid task id");
    }
    return task;
}
function getCurrentTask(task) {
    return __awaiter(this, void 0, void 0, function () {
        var currentTaskResponse, currentTask;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client
                        .getItem({
                        Key: {
                            id: {
                                S: task.task_id
                            }
                        },
                        TableName: taskTableName
                    })
                        .promise()];
                case 1:
                    currentTaskResponse = _a.sent();
                    currentTask = AWS.DynamoDB.Converter.unmarshall(currentTaskResponse.Item);
                    return [2 /*return*/, currentTask];
            }
        });
    });
}
function createUpdateProjectCountQuery(task, shouldSubtract) {
    if (shouldSubtract === void 0) { shouldSubtract = false; }
    return {
        Update: {
            Key: {
                id: {
                    S: task.project_id
                }
            },
            TableName: projectTableName,
            UpdateExpression: "SET tasks_completed = tasks_completed " + (shouldSubtract ? "-" : "+") + " :n",
            ExpressionAttributeValues: {
                ":n": {
                    N: "1"
                }
            }
        }
    };
}
function createTaskStatusQuery(task) {
    return {
        Key: {
            id: {
                S: task.task_id
            }
        },
        TableName: taskTableName,
        UpdateExpression: "SET #s = :t, #sa = :sa",
        ExpressionAttributeValues: {
            ":t": {
                S: task.type
            },
            ":sa": {
                M: {
                    annotations: {
                        L: __spreadArray([], task.sample.annotations.map(function (annotation) {
                            var _a, _b, _c;
                            return {
                                M: {
                                    text: {
                                        S: annotation.text
                                    },
                                    start: {
                                        N: annotation.start.toString()
                                    },
                                    end: {
                                        N: annotation.end.toString()
                                    },
                                    tag: {
                                        M: {
                                            id: {
                                                S: ((_a = annotation === null || annotation === void 0 ? void 0 : annotation.tag) === null || _a === void 0 ? void 0 : _a.id) ||
                                                    ""
                                            },
                                            name: {
                                                S: ((_b = annotation === null || annotation === void 0 ? void 0 : annotation.tag) === null || _b === void 0 ? void 0 : _b.name) ||
                                                    ""
                                            },
                                            description: {
                                                S: ((_c = annotation === null || annotation === void 0 ? void 0 : annotation.tag) === null || _c === void 0 ? void 0 : _c.description) || ""
                                            }
                                        }
                                    }
                                }
                            };
                        }))
                    },
                    text: { S: task.sample.text }
                }
            }
        },
        ExpressionAttributeNames: {
            "#s": "status",
            "#sa": "sample"
        }
    };
}
function createUpdateTaskStatusQuery(task) {
    console.log("createTaskStatusQuery", JSON.stringify({
        Update: createTaskStatusQuery(task)
    }, null, 4));
    return {
        Update: createTaskStatusQuery(task)
    };
}
function updateTaskStatusAndCount(task, shouldSubtract) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client
                        .transactWriteItems({
                        TransactItems: [
                            createUpdateProjectCountQuery(task, shouldSubtract),
                            createUpdateTaskStatusQuery(task),
                        ]
                    })
                        .promise()];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.$response.data];
            }
        });
    });
}
function updateTaskStatus(task) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client
                        .updateItem(createTaskStatusQuery(task))
                        .promise()];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.$response.data];
            }
        });
    });
}
function updateTaskStatusTransaction(task) {
    return __awaiter(this, void 0, void 0, function () {
        var currentTask, currentTaskType, currentTaskStatusIsTodo, nextTaskStatusIsTodo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getCurrentTask(task)];
                case 1:
                    currentTask = _a.sent();
                    currentTaskType = currentTask === null || currentTask === void 0 ? void 0 : currentTask.status;
                    currentTaskStatusIsTodo = currentTaskType === AnnotationTaskStatus.TODO;
                    nextTaskStatusIsTodo = task.type === AnnotationTaskStatus.TODO;
                    if (!(currentTaskStatusIsTodo && !nextTaskStatusIsTodo)) return [3 /*break*/, 3];
                    return [4 /*yield*/, updateTaskStatusAndCount(task)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 3:
                    if (!(!currentTaskStatusIsTodo && nextTaskStatusIsTodo)) return [3 /*break*/, 5];
                    return [4 /*yield*/, updateTaskStatusAndCount(task, true)];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, updateTaskStatus(task)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7: return [4 /*yield*/, getCurrentTask(task)];
                case 8: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.handler = function (event) { return __awaiter(_this, void 0, void 0, function () {
    var task, response, error_1, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                task = getTaskArgument(event);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, updateTaskStatusTransaction(task)];
            case 2:
                response = _a.sent();
                return [2 /*return*/, response];
            case 3:
                error_1 = _a.sent();
                message = error_1.message;
                console.log("finishNerTask error", error_1);
                if (message.match(/ConditionalCheckFailed|The task is already in this status/g)) {
                    throw Error("The task is already in this state");
                }
                throw Error("Sorry, Something went wrong: " + JSON.stringify(error_1.message));
            case 4: return [2 /*return*/];
        }
    });
}); };
