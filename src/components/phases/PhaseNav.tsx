import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function PhaseNav() {
  return (
    <>
      <button id="prev-btn" className="nav-btn" type="button" aria-label="Previous Scene">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button id="next-btn" className="nav-btn" type="button" aria-label="Next Scene">
        <ChevronRight className="w-6 h-6" />
      </button>
    </>
  );
}
