/**
 * This function returns the data formatted as a standard answer, telling that everithing is ok.
 * @param data Additional information
 * @returns The response
 */
export function StandardResponse(data: any = {}) {
    return { ok: true, data }
}
