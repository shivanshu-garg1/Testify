import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({ text, link }) {
  return (
    <button>
    <Link
      to={link}
      className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-800 text-white rounded-lg  border-2 mx-2"
    >
      {text}
    </Link>
    </button>
  );
}
