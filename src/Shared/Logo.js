import * as React from "react";

function NMTLogo(props) {
  return (
    <svg viewBox="0 0 200 200" width="4em" height="4em" {...props}>
      <circle fill="#fff" r={26.409} cx={143.427} cy={138.923} />
      <path fill="#fff" d="M98.747 168.583A68.583 68.583 0 11167.33 100a68.66 68.66 0 01-68.583 68.583zm0-126.17A57.587 57.587 0 10156.334 100a57.652 57.652 0 00-57.587-57.587z" />
      <path fill="#fff" d="M143.427 100a44.68 44.68 0 00-89.36 0h89.36z" />
    </svg>
  );
}

function NMTFullLog(props) {

    console.log(props);

    return (
      <svg {...props} viewBox="-400 200 1800 400">
        <circle fill={(!props.darkTheme ? "#ff9800":"#ff9800")} r={26.409} cx={361.694} cy={390.684} />
        <path fill={(!props.darkTheme ? "#fff":"#000")} d="M197.897 398.325l-43.575-58.645v58.645h-13.787V316.55h13.552l43.81 58.761V316.55h13.551v81.775zM447.988 398.325l-32.592-81.775h14.836l25.233 66.47 25.467-66.47h14.37l-33.061 81.775zM519.242 379.868l-7.826 18.457h-14.37l36.1-81.775h14.135l35.746 81.775H568.31l-7.829-18.457zm20.562-48.6L524.382 367.6h30.841zM634.423 316.55c24.532 0 42.288 17.173 42.288 40.887 0 23.598-17.874 40.888-42.64 40.888h-33.176V316.55zm-19.744 69.393h20.093c15.888 0 28.038-11.801 28.038-28.39 0-16.704-12.499-28.62-28.622-28.62h-19.51zM712.218 328.933v22.08h39.954v12.381h-39.954v22.549h46.029v12.382h-59.813V316.55h58.411v12.383zM869.681 398.325V316.55h13.784v81.775zM267.958 455.716c7.032 0 12.122 4.922 12.122 11.722 0 6.762-5.123 11.72-12.222 11.72h-9.51v-23.442zm-5.66 19.891h5.76a7.858 7.858 0 008.037-8.136 7.992 7.992 0 00-8.204-8.205h-5.593zM293.625 459.266v6.329h11.452v3.55h-11.452v6.462h13.195v3.55h-17.146v-23.441h16.743v3.55zM320.966 459.266v6.765h10.647v3.515h-10.647v9.611h-3.951v-23.441h15.738l-.033 3.55zM341.642 479.157v-23.441h3.951v23.441zM381.305 455.716c4.856 0 7.869 2.211 7.869 5.86a5.13 5.13 0 01-4.118 5.224 5.689 5.689 0 015.023 5.928c0 4.019-3.248 6.43-8.54 6.43h-10.413v-23.442zm-6.228 9.712h6.028c2.512 0 4.017-1.172 4.017-3.149 0-1.974-1.505-3.046-4.017-3.046h-6.028zm0 10.212h6.028c3.082 0 4.922-1.205 4.922-3.414 0-2.078-1.84-3.316-4.922-3.316h-6.028zM410.723 472.057a10.496 10.496 0 01-1.072.035h-5.56v7.065h-3.95v-23.441h9.51c5.993 0 9.443 2.915 9.443 8.003 0 3.752-1.743 6.397-4.857 7.602l5.257 7.836h-4.485zm-1.072-3.515c3.616 0 5.693-1.54 5.693-4.722 0-3.082-2.077-4.554-5.693-4.554h-5.56v9.276zM429.725 479.157v-23.441h3.951v23.441zM454.816 455.716c7.032 0 12.12 4.922 12.12 11.722 0 6.762-5.123 11.72-12.22 11.72h-9.512v-23.442zm-5.66 19.891h5.758a7.857 7.857 0 008.038-8.136 7.992 7.992 0 00-8.204-8.205h-5.593zM495.086 467.637v8.64a15.9 15.9 0 01-9.11 3.047c-6.93 0-12.321-5.19-12.321-11.886 0-6.7 5.456-11.823 12.556-11.823a14.078 14.078 0 019.009 3.283l-2.244 2.912a10.185 10.185 0 00-6.765-2.678 8.325 8.325 0 10.033 16.644 10.91 10.91 0 005.393-1.609v-6.53zM510.001 459.266v6.329h11.452v3.55h-11.452v6.462h13.195v3.55H506.05v-23.441h16.742v3.55zM555.968 459.266v19.891h-3.951v-19.89h-7.4v-3.551H563.4v3.55zM593.653 467.438c0 6.697-5.423 11.886-12.422 11.886s-12.423-5.19-12.423-11.886c0-6.732 5.423-11.823 12.423-11.823s12.422 5.123 12.422 11.823zm-20.829 0a8.405 8.405 0 008.44 8.338 8.307 8.307 0 10-8.44-8.338zM638.385 479.157l-.033-17.513-7.4 15.067h-2.58l-7.4-15.067v17.513h-3.716v-23.441h4.687l7.735 15.572 7.703-15.572h4.655v23.441zM653.608 479.157v-23.441h3.95v23.441zM685.529 479.157l-12.49-16.81v16.81h-3.952v-23.441h3.886l12.556 16.845v-16.845h3.886v23.441zM700.984 479.157v-23.441h3.95v23.441zM732.905 479.157l-12.49-16.81v16.81h-3.952v-23.441h3.883l12.56 16.845v-16.845h3.885v23.441zM767.85 467.637v8.64a15.9 15.9 0 01-9.11 3.047c-6.93 0-12.321-5.19-12.321-11.886 0-6.7 5.456-11.823 12.556-11.823a14.078 14.078 0 019.009 3.283l-2.244 2.912a10.185 10.185 0 00-6.765-2.678 8.325 8.325 0 10.033 16.644 10.91 10.91 0 005.393-1.609v-6.53zM317.015 420.344a68.583 68.583 0 1168.582-68.583 68.66 68.66 0 01-68.582 68.583zm0-126.17a57.587 57.587 0 1057.586 57.587 57.652 57.652 0 00-57.586-57.587z" />
        <path
          fill={(!props.darkTheme ? "#673ab7":"#673ab7")}
          d="M361.694 351.76a44.68 44.68 0 10-89.359 0v.001h89.36z"
        />
        <path  fill={(!props.darkTheme ? "#fff":"#000")} d="M799.812 385.943v-22.549h39.954v-12.382h-39.954v-22.079h44.628V316.55h-58.411v81.775h13.783z" />
      </svg>
    )
  }
  

export { NMTLogo, NMTFullLog };
