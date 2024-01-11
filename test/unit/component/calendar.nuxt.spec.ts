import {describe, expect, it} from "vitest"
import {Calendar} from "#components"
import {mountSuspended} from "@nuxt/test-utils/runtime"
import {before} from "node:test"

let component = "";

describe('Calendar', () => {
  before(async () => {
    component = await mountSuspended(Calendar);
  });

  it('is mounted properly', () => {
    expect(component).toMatchSnapshot();
  });
});

