import { MapPin, ArrowUpRight } from "lucide-react";
import { location } from "@/lib/site";
import { WHATSAPP_URL } from "@/lib/enquiry";

export function LocationMap() {
  return (
    <section className="location-section shell" id="location">
      <div className="location-copy">
        <p className="eyebrow">
          <MapPin size={15} />
          Come through
        </p>
        <h2>
          Find your way
          <br />
          to ROJ.
        </h2>
        <address>
          {location.streetAddress}
          <br />
          {location.area}
          <br />
          Nigeria
        </address>
        <p>
          {location.officeConfirmed
            ? "Find us at House 16B on Road 13. Confirm your session before setting out; we’ll help with arrival arrangements."
            : "The map shows the Ikota Villa area. Message us for the exact office pin and arrival details before you travel."}
        </p>
        <a
          className="button button-orange"
          href={location.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {location.officeConfirmed
            ? "Get directions"
            : "Directions to Ikota Villa"}
          <ArrowUpRight size={18} />
        </a>
        <a
          className="text-link"
          href={`${WHATSAPP_URL}?text=${encodeURIComponent("Hi ROJ! Please send me the exact office location pin and arrival directions.")}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ask for the office pin
          <ArrowUpRight size={17} />
        </a>
      </div>
      <div className="map-frame">
        <iframe
          title={
            location.officeConfirmed
              ? "Google Maps: House 16B, Road 13, Ikota Villa"
              : "Google Maps: Ikota Villa area (office pin pending confirmation)"
          }
          src={`https://maps.google.com/maps?q=${encodeURIComponent(location.mapQuery)}&z=15&output=embed`}
          width="800"
          height="500"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <p>
          <MapPin size={14} />
          {location.officeConfirmed
            ? "ROJ · House 16B, Road 13, Ikota Villa"
            : "Area map · confirm the exact office pin with ROJ"}
        </p>
      </div>
    </section>
  );
}
