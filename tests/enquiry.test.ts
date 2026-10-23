import assert from "node:assert/strict";
import test from "node:test";
import { createEnquiryUrl, WHATSAPP_URL } from "../src/lib/enquiry.ts";

test("routes enquiries to the approved business number", () => {
  const result = new URL(
    createEnquiryUrl({
      name: "Ada",
      service: "Podcasting",
      idea: "A weekly interview series",
    }),
  );
  assert.equal(`${result.origin}${result.pathname}`, WHATSAPP_URL);
  assert.match(result.searchParams.get("text")!, /Service: Podcasting/);
});

test("preserves punctuation, Unicode and line breaks without adding URL parameters", () => {
  const idea = "Film for Tóbi & Co. #Lagos\nBudget: ₦100,000? Let's discuss.";
  const result = new URL(
    createEnquiryUrl({ name: "  Tóbi  ", service: "Film & video", idea }),
  );
  assert.deepEqual([...result.searchParams.keys()], ["text"]);
  assert.ok(result.searchParams.get("text")!.endsWith(idea));
  assert.match(result.searchParams.get("text")!, /Name: Tóbi\n/);
});

test("rejects whitespace-only required details", () => {
  assert.throws(
    () =>
      createEnquiryUrl({
        name: " ",
        service: "Photography",
        idea: "Portraits",
      }),
    /Please add/,
  );
  assert.throws(
    () =>
      createEnquiryUrl({ name: "Ada", service: "Photography", idea: "\n " }),
    /Please add/,
  );
});

test("rejects oversized briefs", () => {
  assert.throws(
    () =>
      createEnquiryUrl({
        name: "Ada",
        service: "Photography",
        idea: "a".repeat(2001),
      }),
    /shorten/,
  );
});
