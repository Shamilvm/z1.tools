import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  X,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const AtsChecker: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<any>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile.type !== "application/pdf") {
      toast.error("Please upload a PDF file");
      return;
    }
    setFile(selectedFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
  });

  const analyzeResume = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axios.post(
        "http://localhost:5001/api/ats/check",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      setReport(response.data);
      toast.success("Analysis complete!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to analyze resume. Check your server connection.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setReport(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">ATS Score Checker</h1>
        <p className="text-gray-600">
          See how your resume performs against modern hiring systems.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!report ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="card bg-primary-50/30 border-dashed border-2 border-primary-200 p-12 flex flex-col items-center"
          >
            {!file ? (
              <div
                {...getRootProps()}
                className="w-full text-center cursor-pointer group"
              >
                <input {...getInputProps()} />
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 mx-auto shadow-sm group-hover:scale-110 transition-transform">
                  <Upload className="text-primary-600 w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {isDragActive
                    ? "Drop it here"
                    : "Click to upload or drag & drop"}
                </h3>
                <p className="text-gray-500">PDF documents only</p>
              </div>
            ) : (
              <div className="w-full text-center">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <FileText className="text-primary-600 w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">{file.name}</h3>
                <p className="text-gray-500 mb-8">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>

                <div className="flex space-x-3 justify-center">
                  <button onClick={reset} className="btn-secondary px-8 h-12">
                    <X className="w-4 h-4 mr-2" /> Cancel
                  </button>
                  <button
                    onClick={analyzeResume}
                    disabled={loading}
                    className="btn-primary px-12 h-12 flex items-center"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Analyze Resume
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            {/* Score Ring */}
            <div className="card text-center p-12">
              <div className="relative w-48 h-48 mx-auto mb-6">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    className="stroke-gray-100 fill-none"
                    strokeWidth="12"
                  />
                  <motion.circle
                    cx="96"
                    cy="96"
                    r="88"
                    className="stroke-primary-600 fill-none"
                    strokeWidth="12"
                    strokeDasharray="552"
                    initial={{ strokeDashoffset: 552 }}
                    animate={{
                      strokeDashoffset: 552 - (552 * report.score) / 100,
                    }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-extrabold text-gray-900">
                    {report.score}
                  </span>
                  <span className="text-gray-500 font-medium">ATS Score</span>
                </div>
              </div>
              <button
                onClick={reset}
                className="text-primary-600 font-medium hover:underline"
              >
                Upload different resume
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Keywords */}
              <div className="card">
                <div className="flex items-center space-x-2 mb-6 text-primary-700">
                  <AlertCircle className="w-5 h-5" />
                  <h3 className="font-bold text-lg">Missing Keywords</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {report?.missingKeywords?.map((kw: string) => (
                    <span
                      key={kw}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="card">
                <div className="flex items-center space-x-2 mb-6 text-primary-700">
                  <Sparkles className="w-5 h-5" />
                  <h3 className="font-bold text-lg">AI Recommendations</h3>
                </div>
                <ul className="space-y-4">
                  {report?.recommendations?.map((rec: string, i: number) => (
                    <li
                      key={i}
                      className="flex items-start space-x-3 text-sm text-gray-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AtsChecker;
