import React, { useEffect, useState } from "react";
import Select, { StylesConfig } from "react-select";
import {
  MAX_LOCAL_IMG_SIZE,
  POKE_ABILITY_API,
  TYPE_COLORS,
} from "../utils/config";
import {
  cleanUpPokemonAbility,
  convertBytesToKilobytes,
  getBase64,
} from "../utils/functions";
import { useFetch } from "../utils/hooks";
import { PokemonData, PokemonResult } from "../utils/types";
import { useCustomPokemon } from "../store";
import shallow from "zustand/shallow";

interface OptionBaseTypes {
  value: string;
  label: string;
}

interface AbilitiesOptionTypes extends OptionBaseTypes {
  isHidden: boolean;
}

interface GroupedOptionTypes {
  label: string;
  options: AbilitiesOptionTypes[];
}

interface TypesOptionTypes extends OptionBaseTypes {
  color: string;
}

const typeOptions: TypesOptionTypes[] = Object.keys(TYPE_COLORS).map((k) => ({
  value: k,
  label: k,
  color: `#${TYPE_COLORS[k]}`,
}));

const pokemonTypesOptionsStyles: StylesConfig<
  OptionBaseTypes & { color: string },
  true
> = {
  multiValue: (styles, { data }) => ({
    ...styles,
    backgroundColor: data.color,
    color: "white",
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    color: "white",
  }),
};

const Form = ({
  editData,
  onSuccess,
}: {
  editData?: PokemonData;
  onSuccess?: () => void;
}) => {
  const [abilityOptions, setAbilityOptions] = useState<GroupedOptionTypes[]>(
    []
  );

  const { addCustomPokemon, editCustomPokemon, totalCreated } =
    useCustomPokemon(
      (state) => ({
        customPokemons: state.customPokemons,
        totalCreated: state.totalCreated,
        addCustomPokemon: state.addCustomPokemon,
        editCustomPokemon: state.editCustomPokemon,
      }),
      shallow
    );

  const [selectedTypes, setSelectedTypes] = useState<TypesOptionTypes[]>(
    editData?.types.map((type) => ({
      value: type.name,
      label: type.name,
      color: `#${TYPE_COLORS[type.name]}`,
    })) || []
  );
  const [selectedAbilities, setSelectedAbilities] = useState<
    AbilitiesOptionTypes[]
  >(
    editData?.abilities.map((ability) => ({
      value: ability.name,
      label: ability.name,
      isHidden: ability.isHidden,
    })) || []
  );
  const [inputVal, setInputVal] = useState({
    pokemonName: editData?.name || "",
    pokemonDescription: editData?.description || "",
    pokemonWeight: editData?.weight.toString() || "",
    pokemonHeight: editData?.height.toString() || "",
    pokemonRarity: editData?.isLegendary || false,
  });

  const [errorMsg, setErrorMsg] = useState({
    pokemonImage: "",
  });

  const [imageUrlInput, setImageUrlInput] = useState("");

  const { data, loading } = useFetch<{ results: PokemonResult[] }>(
    POKE_ABILITY_API
  );

  useEffect(() => {
    if (data) {
      const abilityOptions = data.results.map((d) => ({
        value: d.name,
        label: d.name,
      }));
      const groupedOptions: GroupedOptionTypes[] = [
        {
          label: "Normal",
          options: abilityOptions.map((a) => ({
            ...a,
            isHidden: false,
          })),
        },
        {
          label: "Hidden",
          options: abilityOptions.map((a) => ({
            ...a,
            label: `${a.label} (Hidden)`,
            isHidden: true,
          })),
        },
      ];
      setAbilityOptions(groupedOptions);
    }
  }, [data]);

  const checkIsSelectedTypesReachedLimit = (
    _: TypesOptionTypes,
    selected: readonly TypesOptionTypes[]
  ) => {
    if (selected.length >= 2) {
      return true;
    }
    return false;
  };

  const checkIsSelectedAbilitiesReachedLimit = (
    option: AbilitiesOptionTypes,
    selected: readonly AbilitiesOptionTypes[]
  ) => {
    if (selected.length >= 3) return true;
    if (
      selected.filter((s) => s.isHidden === true).length >= 1 &&
      option.isHidden
    ) {
      return true;
    }
    if (
      selected.filter((s) => s.isHidden === false).length >= 2 &&
      !option.isHidden
    ) {
      return true;
    }
    return false;
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      let file = e.target.files[0];
      if (
        parseFloat(convertBytesToKilobytes(e.target.files[0].size)) >
        MAX_LOCAL_IMG_SIZE
      ) {
        setErrorMsg({
          ...errorMsg,
          ["pokemonImage"]: "File size is too big.",
        });
        return false;
      } else {
        setErrorMsg({
          ...errorMsg,
          ["pokemonImage"]: "",
        });

        getBase64(file).then((result) => {
          setImageUrlInput(typeof result === "string" ? result : "");
        });
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
  ) => {
    const { value, id, type, checked } = e.target;
    switch (type) {
      case "checkbox":
        setInputVal({ ...inputVal, [id]: checked });
        break;
      default:
        setInputVal({ ...inputVal, [id]: value });
    }
  };

  const handleFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const {
      pokemonName,
      pokemonDescription,
      pokemonWeight,
      pokemonHeight,
      pokemonRarity,
    } = inputVal;
    const data = {
      id: editData ? editData.id : `${totalCreated + 1}-c`,
      name: pokemonName,
      isLegendary: pokemonRarity,
      description: pokemonDescription,
      types: selectedTypes.map((type) => ({ name: type.value })),
      abilities: selectedAbilities.map((ability) => ({
        name: cleanUpPokemonAbility(ability.value),
        isHidden: ability.isHidden,
      })),
      height: parseFloat(pokemonHeight),
      weight: parseFloat(pokemonWeight),
      imageUrl: imageUrlInput
        ? imageUrlInput
        : editData
        ? editData.imageUrl
        : "",
      custom: true,
    };
    if (editData) {
      editCustomPokemon(data);
    } else {
      addCustomPokemon(data);
    }
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="container mx-auto px-4 pb-2">
      <form onSubmit={handleFormSubmit}>
        <div className="form-group mb-6">
          <label
            htmlFor="pokemonName"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Name
          </label>
          <input
            required
            type="text"
            onChange={handleInputChange}
            value={inputVal.pokemonName}
            className="form-control block w-full px-3 py-2 text-gray-700 border border-gray-300 rounded"
            id="pokemonName"
            placeholder="Insert Pokémon name"
          />
        </div>
        <div className="form-group mb-6">
          <label
            htmlFor="pokemonImage"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Image
          </label>
          <input
            type="file"
            className="form-control block w-full px-3 py-2 text-gray-700 border border-gray-300 rounded"
            id="pokemonImage"
            accept="image/*"
            onChange={handleFileInputChange}
            placeholder="Insert Pokémon name"
          />
          <small
            id="pokemonImageHelp"
            className="block mt-1 text-xs text-gray-600 mx-1"
          >
            Max allowed image file size is 200kb.
            {errorMsg.pokemonImage ? (
              <span className="ml-1 text-red-700">{errorMsg.pokemonImage}</span>
            ) : null}
          </small>
        </div>
        <div className="form-group mb-6">
          <label
            htmlFor="pokemonTypes"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Type(s)
          </label>
          <Select
            className="capitalize border-gray-300 text-gray-700"
            closeMenuOnSelect={true}
            isMulti
            required
            name="pokemonTypes"
            options={typeOptions}
            styles={pokemonTypesOptionsStyles}
            placeholder={"Select Pokémon types"}
            value={selectedTypes}
            onChange={(e) => setSelectedTypes([...e])}
            isOptionDisabled={checkIsSelectedTypesReachedLimit}
          />
          <small
            id="pokemonTypesHelp"
            className="block mt-1 text-xs text-gray-600 mx-1"
          >
            Pokémon can have up to two types as dual-type Pokémon.{" "}
            <a
              className="text-blue-500"
              target="_blank"
              rel="noopener noreferrer"
              href="https://pokemon.fandom.com/wiki/Types#:~:text=Pok%C3%A9mon%20themselves%20can%20have%20up,%2FFlying%2Dtype%20move)."
            >
              Reference
            </a>
          </small>
        </div>
        <div className="form-group mb-6">
          <label
            htmlFor="pokemonAbility"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Abilities
          </label>
          <Select<AbilitiesOptionTypes, true, GroupedOptionTypes>
            className="capitalize border-gray-300 text-gray-700"
            closeMenuOnSelect={true}
            name="pokemonAbility"
            isMulti
            required
            placeholder={"Select Pokémon ability"}
            value={selectedAbilities}
            options={abilityOptions}
            isLoading={loading}
            onChange={(e) => setSelectedAbilities([...e])}
            isOptionDisabled={checkIsSelectedAbilitiesReachedLimit}
          />
          <small
            id="pokemonTypesHelp"
            className="block mt-1 text-xs text-gray-600 mx-1"
          >
            The most Abilities any Pokémon has is three: two normal Abilities
            and one Hidden Ability.{" "}
            <a
              className="text-blue-500"
              target="_blank"
              rel="noopener noreferrer"
              href="https://bulbapedia.bulbagarden.net/wiki/Ability#:~:text=The%20most%20Abilities%20any%20species,if%20the%20species%20has%20two)."
            >
              Reference
            </a>
          </small>
        </div>
        <div className="form-group mb-6">
          <label
            htmlFor="pokemonDescription"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Description
          </label>
          <textarea
            className="form-control block w-full px-3 py-2 text-gray-700 border border-gray-300 rounded"
            id="pokemonDescription"
            required
            rows={4}
            value={inputVal.pokemonDescription}
            onChange={handleInputChange}
            placeholder="Insert Pokémon description"
          />
        </div>
        <div className="flex gap-3 flex-col sm:flex-row">
          <div className="form-group mb-6 flex-1">
            <label
              htmlFor="pokemonWeight"
              className="form-label inline-block mb-2 text-gray-700"
            >
              Weight(kg)
            </label>
            <input
              type="number"
              required
              onChange={handleInputChange}
              value={inputVal.pokemonWeight}
              className="form-control block w-full px-3 py-2 text-gray-700 border border-gray-300 rounded"
              id="pokemonWeight"
              placeholder="Insert Pokémon weight"
            />
          </div>
          <div className="form-group mb-6 flex-1">
            <label
              htmlFor="pokemonHeight"
              className="form-label inline-block mb-2 text-gray-700"
            >
              Height(cm)
            </label>
            <input
              type="number"
              className="form-control block w-full px-3 py-2 text-gray-700 border border-gray-300 rounded"
              id="pokemonHeight"
              required
              onChange={handleInputChange}
              value={inputVal.pokemonHeight}
              placeholder="Insert Pokémon height"
            />
          </div>
        </div>
        <div className="form-group mb-6 flex items-center">
          <label
            htmlFor="pokemonRarity"
            className="form-label inline-block text-gray-700 cursor-pointer"
          >
            <input
              type="checkbox"
              className="form-control h-4 w-4  text-gray-700 border border-gray-300 rounded mr-2 cursor-pointer"
              id="pokemonRarity"
              placeholder="Insert Pokémon name"
              checked={inputVal.pokemonRarity}
              value={"isLegendary"}
              onChange={handleInputChange}
            />
            Is Legendary?
          </label>
        </div>
        <button
          className="rounded bg-blue-700 text-white px-3 py-2"
          type="submit"
        >
          {editData ? "Save" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default Form;
