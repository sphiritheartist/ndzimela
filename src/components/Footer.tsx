export default function Footer() {
  return (
    <footer className="border-t border-border-color bg-background text-foreground/60">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start mb-6 md:mb-0">
            <div className="text-center md:text-left space-y-2">
              <p className="text-sm font-semibold text-foreground">
                Ndzimela Property Investments
              </p>
              <p className="text-xs">
                Registered Office: 90 Storms Road, Norkem Park,<br />
                Kempton Park, 1619, South Africa
              </p>
            </div>
          </div>
          <div className="mt-8 md:mt-0">
            <p className="text-center text-xs">
              &copy; {new Date().getFullYear()} SPhiriTheArtist. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
