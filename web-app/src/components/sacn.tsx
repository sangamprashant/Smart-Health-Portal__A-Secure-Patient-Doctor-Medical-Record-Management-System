import { useEffect, useRef, useState } from "react";
import { ScanLine, Camera, SwitchCamera } from "lucide-react";
import { Html5Qrcode } from "html5-qrcode";
import Scroll from "./page-binder/Scroll";

const ScanPage = () => {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [cameraId, setCameraId] = useState<string | null>(null);
  const [devices, setDevices] = useState<any[]>([]);
  const [scannedText, setScannedText] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [isFrontCamera, setIsFrontCamera] = useState(false);

  useEffect(() => {
    Html5Qrcode.getCameras().then((cams) => {
      if (cams.length) {
        setDevices(cams);
        setCameraId(cams[0].id);
      }
    });

    return () => {
      scannerRef.current?.stop().catch(() => { });
    };
  }, []);

  const startScanner = async () => {
    if (!cameraId) return;


    const selectedCamera = devices.find(d => d.id === cameraId);
    const isFront =
      selectedCamera?.label?.toLowerCase().includes("front") ||
      selectedCamera?.label?.toLowerCase().includes("user");

    setIsFrontCamera(isFront);

    if (!scannerRef.current) {
      scannerRef.current = new Html5Qrcode("reader");
    }

    setIsScanning(true);

    await scannerRef.current.start(
      cameraId,
      { fps: 10, qrbox: 260 },
      (text) => {
        setScannedText(text);
        setIsScanning(false);
        scannerRef.current?.stop();
      },
      () => { }
    );

  };

  const switchCamera = async () => {
    if (devices.length < 2 || !scannerRef.current) return;

    const currentIndex = devices.findIndex(d => d.id === cameraId);
    const nextIndex = (currentIndex + 1) % devices.length;
    const nextCamera = devices[nextIndex];

    const isFront =
      nextCamera.label?.toLowerCase().includes("front") ||
      nextCamera.label?.toLowerCase().includes("user");

    setIsFrontCamera(isFront);
    setCameraId(nextCamera.id);

    await scannerRef.current.stop();

    await scannerRef.current.start(
      nextCamera.id,
      { fps: 10, qrbox: 260 },
      (text) => {
        setScannedText(text);
        setIsScanning(false);
        scannerRef.current?.stop();
      },
      () => { }
    );

  };

  return (
    <Scroll>
      <div className="py-12 bg-slate-50 flex flex-col items-center justify-center px-4">

        {!isScanning && (
          <div className="text-center mb-6">
            <ScanLine size={70} className="text-blue-900 mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-gray-900">
              Emergency QR / Document Scanner
            </h2>
            <p className="text-gray-600 mt-2">
              Scan QR code or document using front or back camera
            </p>
          </div>
        )}

        <div
          id="reader"
          className={`w-full max-w-sm rounded-xl overflow-hidden border bg-black ${isFrontCamera ? "scale-x-[-1]" : ""}`}
        />

        <div className="flex gap-4 mt-5">
          {!isScanning && (
            <button
              onClick={startScanner}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg"
            >
              <Camera size={18} /> Start Camera
            </button>)}
          {devices.length > 1 && (
            <button
              onClick={switchCamera}
              className="flex items-center gap-2 bg-gray-800 text-white px-5 py-2 rounded-lg"
            >
              <SwitchCamera size={18} /> Switch
            </button>
          )}
        </div>

        {scannedText && (
          <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-lg w-full max-w-sm">
            <p className="text-green-800 font-semibold">
              Scanned Result:
            </p>
            <p className="break-all text-gray-800 mt-2">
              {scannedText}
            </p>
          </div>
        )}
      </div>
    </Scroll>
  );
};

export default ScanPage;
