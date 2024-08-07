import { Autocomplete, TextField, Chip, AccordionDetails } from "@mui/material";
import { setKeywordAbility, setKeywordIdentity } from "./KeywordsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";

const keywordAbilitiesOptions = [
  "Hero",
  "Monster",
  "Infantry",
  "Cavalry",
  "Warmachine",
  "Beast",
  "Warmaster",
  "Unique",
  "Manifestation",
  "Endless Spell",
  "Invocation",
  "Faction Terrain",
  "Fly",
  "Champion",
];

const keywordIdentitiesOptions = [
  "Order",
  "Chaos",
  "Death",
  "Destruction",
  "Beasts of Chaos",
  "Bonesplittaz",
  "Blades Of Khorne",
  "Cities Of Sigmar",
  "Daughters Of Khaine",
  "Disciples Of Tzeench",
  "Flesh Eater Courts",
  "Fyreslayers",
  "Gloomspite Gitz",
  "Hedonites Of Slaanesh",
  "Idoneth Deepkin",
  "Kharadron Overlords",
  "Lumineth RealmLords",
  "Maggotkin Of Nurgle",
  "Nighthaunt",
  "Ogor Mawtribes",
  "Orruk Ironjawz",
  "Orruk KruleBoyz",
  "Ossiarch Bonereapers",
  "Seraphon",
  "Skaven",
  "Slaves To Darkness",
  "Sons Of Behemat",
  "Sons of Hashut",
  "Soulblight Gravelords",
  "Stormcast Eternals",
  "Sylvaneth",
];

export default function Keywords() {
  const dispatch = useDispatch();

  const keywordAbilities = useSelector((state: RootState) => state.keywords.keywordAbilities);
  const keywordIdentities = useSelector((state: RootState) => state.keywords.keywordIdentities);

  return (
    <AccordionDetails sx={{ display: "flex", flexWrap: "wrap", maxWidth: "1.0" }}>
      <Autocomplete
        clearIcon={false}
        options={keywordAbilitiesOptions}
        value={keywordAbilities}
        freeSolo
        fullWidth
        multiple
        onChange={(event, value) => {
          console.log(event);
          dispatch(setKeywordAbility(value));
        }}
        renderTags={(value, props) =>
          value.map((option, index) => <Chip label={option} {...props({ index })} />)
        }
        renderInput={(params) => (
          <TextField
            label="Keyword-abilities (Ward (6+), Fly, Infantry, Champion, Musician (1/10), etc"
            {...params}
            id="keyword-abilities"
          />
        )}
      />

      <Autocomplete
        clearIcon={false}
        options={keywordIdentitiesOptions}
        value={keywordIdentities}
        freeSolo
        sx={{ mt: 2 }}
        fullWidth
        multiple
        onChange={(_event, value) => {
          dispatch(setKeywordIdentity(value));
        }}
        renderTags={(value, props) =>
          value.map((option, index) => <Chip label={option} {...props({ index })} />)
        }
        renderInput={(params) => (
          <TextField
            label="Keyword Identities (Grand Alliance, Faction, faction specific unit)"
            {...params}
            id="keyword-identities"
          />
        )}
      />
    </AccordionDetails>
  );
}
