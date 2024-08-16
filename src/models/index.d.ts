import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";





type EagerPlayer = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Player, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly emoji?: string | null;
  readonly katschings: number;
  readonly lastKatsching: string;
  readonly history?: (HistoryEntry | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPlayer = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Player, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly emoji?: string | null;
  readonly katschings: number;
  readonly lastKatsching: string;
  readonly history: AsyncCollection<HistoryEntry>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Player = LazyLoading extends LazyLoadingDisabled ? EagerPlayer : LazyPlayer

export declare const Player: (new (init: ModelInit<Player>) => Player) & {
  copyOf(source: Player, mutator: (draft: MutableModel<Player>) => MutableModel<Player> | void): Player;
}

type EagerHistoryEntry = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<HistoryEntry, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly playerId: string;
  readonly time: string;
  readonly event: string;
  readonly comments?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyHistoryEntry = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<HistoryEntry, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly playerId: string;
  readonly time: string;
  readonly event: string;
  readonly comments?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type HistoryEntry = LazyLoading extends LazyLoadingDisabled ? EagerHistoryEntry : LazyHistoryEntry

export declare const HistoryEntry: (new (init: ModelInit<HistoryEntry>) => HistoryEntry) & {
  copyOf(source: HistoryEntry, mutator: (draft: MutableModel<HistoryEntry>) => MutableModel<HistoryEntry> | void): HistoryEntry;
}