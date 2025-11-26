import { Question, Answer, Account } from "./index.js";

// Test case file, just do node unitTests.js to run them

// Test framework
async function test(name, func) {
  try {
    await func();
    console.log(`${name}: PASS`);
  } catch (e) {
    console.log(`${name}: FAIL`);
    console.error(e);
  }
}

async function runTests() {

    await test("TC1 - Question.getAll()", async () => {
        const [rows] = await Question.getAll();
        if (!Array.isArray(rows)) {
            throw new Error("Response is not an array");
        }
    });
    
    await test("TC2 - Question.create()", async () => {
        const [result] = await Question.create("Test question from unit test");
        if (result.affectedRows !== 1) {
            throw new Error("Question not created");
        }
    });

    await test("TC3 - Question.deleteById()", async () => {
        const [result] = await Question.deleteById(999999);
        if (typeof result.affectedRows !== "number") {
            throw new Error("Delete question result invalid");
        }
    });

    await test("TC4 - Answer.getAll()", async () => {
        const [rows] = await Answer.getAll();
        if (!Array.isArray(rows)) {
            throw new Error("Response is not an array");
        }
    });

    await test("TC5 - Answer.create()", async () => {
        const [result] = await Answer.create(1, "Test answer from unit test", 5);
        if (result.affectedRows !== 1) {
            throw new Error("Answer not created");
        }
    });

    await test("TC6 - Answer.deleteById()", async () => {
        const [result] = await Answer.deleteById(999999);
        if (typeof result.affectedRows !== "number") {
            throw new Error("Delete answer result invalid");
        }
    });

    await test("TC7 - Account.getAll()", async () => {
        const [rows] = await Account.getAll();
        if (!Array.isArray(rows)) {
            throw new Error("Response is not an array");
        }
    });

    await test("TC8 - Account.getById()", async () => {
        const [rows] = await Account.getById(1);
        if (!Array.isArray(rows)) {
            throw new Error("Response is not an array");
        }
    });

    await test("TC9 - Account.getByUsernameAndPassword()", async () => {
        const [rows] = await Account.getByUsernameAndPassword("testuser", "testpass");
        if (!Array.isArray(rows)) {
            throw new Error("Response is not an array");
        }
    });
}

runTests();