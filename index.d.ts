declare const watchClipboard: any;
declare const clipboard: any;
declare const yargs: any;
declare let json: any;
declare function run(): void;
declare let lastClipboardEntry: string;
declare let clipboardFunctions: any[];
declare class ClipboardCallback {
    constructor(callback: (arg0?: string) => void);
    callback: (arg0: string) => any;
    callbackid: number;
}
declare function watchChanges(callback: (arg0?: string) => void): ClipboardCallback;
declare function unWatchChanges(id: number | string): void;
//# sourceMappingURL=index.d.ts.map