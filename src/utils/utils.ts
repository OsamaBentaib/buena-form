export const formatPhoneNumber = (phoneNumber: string) => {
    // Clean the input to remove non-numeric characters, but keep the plus sign for international numbers
    const cleaned = phoneNumber.replace(/[^0-9+]/g, '');
  
    // Ensure that the number starts with a plus sign if it's meant to be international
    if (cleaned.startsWith('+')) {
      // Use slice and join to insert spaces
      const internationalParts = [];
      internationalParts.push(cleaned.slice(0, 3));
      if (cleaned.length > 3) internationalParts.push(cleaned.slice(3, 6));
      if (cleaned.length > 6) internationalParts.push(cleaned.slice(6, 9));
      if (cleaned.length > 9) internationalParts.push(cleaned.slice(9));
      return internationalParts.join(' ');
    }
  
    // For domestic numbers
    const domesticParts = [];
    if (cleaned.length > 0) domesticParts.push(cleaned.slice(0, 3));
    if (cleaned.length > 3) domesticParts.push(cleaned.slice(3, 6));
    if (cleaned.length > 6) domesticParts.push(cleaned.slice(6, 9));
    if (cleaned.length > 9) domesticParts.push(cleaned.slice(9));
    return domesticParts.join(' ');
  };
  