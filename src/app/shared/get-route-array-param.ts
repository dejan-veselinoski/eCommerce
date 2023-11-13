import { ParamMap } from '@angular/router';

export function getRouteArrayParam(paramMap: ParamMap, paramName: string): string[] {
    const existing = paramMap.getAll(paramName);
    if (!existing) {
        return [];
    }
    let result = existing;
    if (existing.length === 1) {
        const value = existing[0];
        if (value.indexOf(',') > -1) {
            result = value.split(',');
        } else {
            result = [value];
        }
    }
    return result.filter(x => !!x);
}
