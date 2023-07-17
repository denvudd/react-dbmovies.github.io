import { checkDepartmentName } from "@/utils/checkDepartmentName";

describe('checkDepartmentName', () => {
  it('returns the correct department name in Ukrainian language', () => {
    expect(checkDepartmentName('Directing')).toEqual('Режисура');
    expect(checkDepartmentName('Art')).toEqual('Художній відділ');
    expect(checkDepartmentName('Actors')).toEqual('Актор');
    expect(checkDepartmentName('Crew')).toEqual('Персонал');
    expect(checkDepartmentName('Sound')).toEqual('Звук');
  });

  it('returns "-" for unknown department names', () => {
    expect(checkDepartmentName('Unknown')).toEqual('-');
    expect(checkDepartmentName('Invalid')).toEqual('-');
  });
});