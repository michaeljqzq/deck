interface Tag {
  key: string;
  value: string;
}

export default class Utility {
  public static readonly TAG_LIMITATION: number = 3;
  public static readonly TAG_KEY_LENGTH_LIMITATION: number = 5;
  public static readonly TAG_VALUE_LENGTH_LIMITATION: number = 6;
  public static readonly TAG_INVALID_CHAR_REG_EXR: RegExp = /[<>%&\\?/]/g;

  public static getTagErrorMessage(tagsObject: Tag): string | null {
    if (!tagsObject) return 'instanceTags is not defined';
    let length: number = Object.keys(tagsObject).length;
    if (!(length >= 0 && length <= Utility.TAG_LIMITATION))
      return `Number of tags exceeds the limit: ${Utility.TAG_LIMITATION}`;
    for (let [k, v] of Object.entries(tagsObject)) {
      if (k.length > Utility.TAG_KEY_LENGTH_LIMITATION)
        return `Length of Tag key: ${k} exceeds the limit: ${Utility.TAG_KEY_LENGTH_LIMITATION}`;
      if (v.length > Utility.TAG_VALUE_LENGTH_LIMITATION)
        `Length of Tag value: ${v} exceeds the limit: ${Utility.TAG_VALUE_LENGTH_LIMITATION}`;
      if (Utility.TAG_INVALID_CHAR_REG_EXR.test(k)) return `Invalid characters in Tag key: ${k}`;
      if (Utility.TAG_INVALID_CHAR_REG_EXR.test(v)) `Invalid characters in Tag value: ${v}`;
    }
    return null;
  }
}
