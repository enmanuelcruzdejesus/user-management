
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import * as api from '../api/userApi';     // adjust path as needed

const USERS_KEY = ['users'];

/* --------------------------- Queries --------------------------- */

export function useUsers() {
  return useQuery({
    queryKey: USERS_KEY,
    queryFn: api.listUsers,
  });
}

export function useLocalTime(id, options = {}) {
  return useQuery({
    queryKey: ['localTime', id],
    queryFn: () => api.fetchLocalTime(id),
    enabled: !!id,
    ...options,
  });
}

/* -------------------------- Mutations -------------------------- */

export function useCreateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.createUser,
    onSuccess: () => qc.invalidateQueries({ queryKey: USERS_KEY }),
  });
}

export function useUpdateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, patch }) => api.updateUser(id, patch),
    onSuccess: () => qc.invalidateQueries({ queryKey: USERS_KEY }),
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.deleteUser,
    onSuccess: () => qc.invalidateQueries({ queryKey: USERS_KEY }),
  });
}
