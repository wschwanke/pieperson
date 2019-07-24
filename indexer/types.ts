export namespace PathOfExile {
  export interface Response {
    next_change_id: string;
    stashes: PublicStashOriginal[];
  }

  export interface PublicStashOriginal {
    id: string;
    public: boolean;
    accountName: string | null;
    lastCharacterName: string | null;
    stash: string | null;
    stashType: string;
    league: string;
    items: any[];
  }

  export interface PublicStash {
    stashId: string;
    public: boolean;
    accountName: string | null;
    lastCharacterName: string | null;
    stash: string | null;
    stashType: string;
    league: string;
    items: any[];
  }

  export interface Item {
    id: string;
  }
}
