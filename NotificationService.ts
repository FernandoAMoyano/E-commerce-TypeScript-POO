import Swal from "sweetalert2";

export class NotificationService {
  private static Toast: any = null;

  public static initialize(): void {
    if (typeof Swal !== "undefined") {
      this.Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast: any) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
    }
  }

  public static showSuccess(message: string): void {
    if (this.Toast) {
      this.Toast.fire({
        icon: "success",
        title: message,
      });
    } else {
      console.log(`Success: ${message}`);
    }
  }

  public static async showConfirmation(
    title: string,
    text: string
  ): Promise<boolean> {
    if (typeof Swal !== "undefined") {
      const result = await Swal.fire({
        title,
        text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });
      return result.isConfirmed;
    } else {
      return confirm(`${title}\n${text}`);
    }
  }
}
