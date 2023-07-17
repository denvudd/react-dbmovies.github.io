import { formatRuntime } from "@/utils/formatRuntime";

describe('formatRuntime', () => {
  it('formats the runtime correctly when minutes are less than 60', () => {
    const runtime = 45;
    const formattedRuntime = formatRuntime(runtime);

    expect(formattedRuntime).toBe("45хв");
  });

  it('formats the runtime correctly when minutes are a multiple of 60', () => {
    const runtime = 120;
    const formattedRuntime = formatRuntime(runtime);

    expect(formattedRuntime).toBe("2г");
  });

  it('formats the runtime correctly when minutes are not a multiple of 60', () => {
    const runtime = 135;
    const formattedRuntime = formatRuntime(runtime);

    expect(formattedRuntime).toBe("2г 15хв");
  });
});