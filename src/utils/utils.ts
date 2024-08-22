export const formatPhoneNumber = (phoneNumber: string): string => {
  const cleaned = phoneNumber.replace(/[^0-9+]/g, '');

  const formatParts = (str: string, partLengths: number[]) => {
    const parts = [];
    let index = 0;

    for (const length of partLengths) {
      if (index < str.length) {
        parts.push(str.slice(index, index + length));
        index += length;
      } else {
        break;
      }
    }

    if (index < str.length) {
      parts.push(str.slice(index));
    }

    return parts.join(' ');
  };

  if (cleaned.startsWith('+')) {
    return formatParts(cleaned, [3, 3, 3]);
  } else {
    return formatParts(cleaned, [3, 3, 3]);
  }
};

  