import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({ text, link }) {
  return (
    <button>
    <Link
      to={link}
      className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 mx-2"
    >
      {text}
    </Link>
    </button>
  );
}
