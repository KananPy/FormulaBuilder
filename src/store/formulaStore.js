import { create } from "zustand";

export const useFormulaStore = create((set, get) => ({
  tags: [],

  formulaString: "",

  addTag: (tag) => {
    set((state) => {
      const newTags = [...state.tags, tag];

      let newFormulaString = "";
      newTags.forEach((tag, index) => {
        if (index > 0) {
          newFormulaString += " ";
        }

        newFormulaString += tag.value;
      });

      return {
        tags: newTags,
        formulaString: newFormulaString,
      };
    });
  },

  removeTag: (index) => {
    set((state) => {
      const newTags = state.tags.filter((_, i) => i !== index);

      let newFormulaString = "";
      newTags.forEach((tag, index) => {
        if (index > 0) {
          newFormulaString += " ";
        }
        newFormulaString += tag.value;
      });

      return {
        tags: newTags,
        formulaString: newFormulaString,
      };
    });
  },

  updateTag: (index, newTagData) => {
    set((state) => {
      const newTags = [...state.tags];
      newTags[index] = { ...newTags[index], ...newTagData };

      let newFormulaString = "";
      newTags.forEach((tag, index) => {
        if (index > 0) {
          newFormulaString += " ";
        }
        newFormulaString += tag.value;
      });

      return {
        tags: newTags,
        formulaString: newFormulaString,
      };
    });
  },

  setFormulaString: (newFormulaString) => {
    set({ formulaString: newFormulaString });
  },

  clearFormula: () => {
    set({
      tags: [],
      formulaString: "",
    });
  },
}));
