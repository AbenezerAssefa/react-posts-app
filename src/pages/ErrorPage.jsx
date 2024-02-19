// import React from "react";
// import { Link } from "react-router-dom";

// const ErrorPage = () => {
//   return (
//     <div>
//       <section className="error-page">
//         <div className="center">
//           <Link to="/" className="btn primary">
//             Go Back Home
//           </Link>
//           <h2>Page Not Found</h2>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default ErrorPage;

import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="error-page">
      <div className="center">
        <h2>Page Not Found</h2>
        <p>
          The page you are looking for might be under construction or does not
          exist.
        </p>
        <Link to="/" className="btn primary">
          Go Back Home
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
