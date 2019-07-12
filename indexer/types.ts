export namespace PathOfExile {
  export interface NextChangeId {
    nextChangeId: string;
  }

  export interface PublicStash {
    id: string;
    accountName: string | null;
    lastCharacterName: string | null;
    stash: string | null;
    stashType: string;
    items: any[];
    public: boolean;
  }
}
