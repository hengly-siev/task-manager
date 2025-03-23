export class Logger {
    public static info(message: string): void {
      console.log(`[INFO] ${message}`);
    }
  
    public static error(message: string): void {
      console.error(`[ERROR] ${message}`);
    }
  }
  